<?php

namespace App\Controller\ApiControllers;

use App\Entity\Book;
use App\Form\BookFormType;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class ApiBookController extends AbstractController
{

    #[Route('api/v1/beta/books', name: 'app_api_book_list', methods: ['GET'])]
    public function bookList(BookRepository $bookRepository): Response
    {
        $books = $bookRepository->findAll();

        return $this->json($books, 200, [], ['groups' => 'books.list']);
    }

    #[Route('api/v1/beta/book/new', name: 'app_api_book_new', methods: ['POST'])]
    public function bookNew(Request $request, EntityManagerInterface $entityManager)
    {
        if ($this->isGranted('ROLE_ADMIN')) {
            return $this->json([
                'message' => [
                    'content' => 'Vous n\avez pas accès à cette page',
                    'level' => 'error'
                ]
            ],
                302);
        }

        $content = $request->getContent();

        $formBook = $this->createForm(BookFormType::class);
        $formBook->submit(array($content));

        if (!$formBook->isValid()) {
            $errors = [];
            foreach ($formBook->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['content' => $errors, 'level' => 'error'],
            ], 401,[]);
        }

        $book = new Book();

        $book->setTitle($content->title);
        $book->setDescription($content->description);
        $book->setEditor($content->editor);
        $book->setPublishedAt($content->publishedAt);
        $book->setAuthor($content->author);

        try {
            $entityManager->persist($book);
            $entityManager->flush();
        } catch (\Exception) {
            return $this->json([
                'message' => ['content' => 'Une erreur s\'est produite.', 'level' => 'error']
            ],403, []);

        }
        return $this->json([
            'user'    => $book->toArray(),
            'message' => ['content' => 'Votre compte a bien été créé', 'level' => 'success']
        ], 201, []);

    }

    #[Route('api/v1/beta/book/{id}', name: 'app_api_book_show', methods: ['GET'])]
    public function bookShow($id, BookRepository $bookRepository): Response
    {
        $book = $bookRepository->findOneBy([
            'id' => $id
        ]);

        if(!$book){
            return $this->json([
                'message' => [
                    'content' => 'Le livre demandé n\'hexiste pas.',
                    'level' => 'error'
                ]
            ],
            302);
        }

        return $this->json($book, 200, [], ['groups' => 'book.show']);
    }
}
