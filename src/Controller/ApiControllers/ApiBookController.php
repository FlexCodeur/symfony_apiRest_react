<?php

namespace App\Controller\ApiControllers;

use App\Entity\Book;
use App\Form\BookFormType;
use App\Repository\AuthorRepository;
use App\Repository\BookRepository;
use App\Repository\KindRepository;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityManagerInterface;
use http\Exception\BadHeaderException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('api/v1/beta/book/new', name: 'app_api_book_new', methods: ['GET','POST'])]
    public function bookNew
        (
            Request $request,
            EntityManagerInterface $entityManager,
            AuthorRepository $authorRepository,
            KindRepository $kindRepository
        )
    {

        $content = json_decode($request->getContent());

        $formBook = $this->createForm(BookFormType::class);
        $formBook->submit((array)$content);

        $authorId = $content->author;
        $kinds = $content->kinds;

        if (!$formBook->isValid()) {
            $errors = [];
            foreach ($formBook->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => [
                    'content' => $errors,
                    'level' => 'error'
                ],
            ], 401,[]);
        }

        $book = new Book();

        $book->setTitle($content->title);
        $book->setDescription($content->description);
        $book->setPublishedAt(new \DateTime($content->publishedAt));
        $book->setIsbn($content->isbn);
        $book->setEditor($content->editor);
        $book->setAuthor($authorId ? $authorRepository->find($authorId) : NULL );
        foreach ($kinds as $kind) {
            $book->getKinds()->add($kindRepository->find($kind));
        }

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
        ], 201, [], ['groups' => 'book.show']);

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
