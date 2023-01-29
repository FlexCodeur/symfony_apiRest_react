<?php

namespace App\Controller\ApiControllers;

use App\Entity\Book;
use App\Form\BookFormType;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
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
    public function bookNew(Request $request, EntityManagerInterface $entityManager)
    {
        $content = json_decode($request->getContent());

        $newBook = new Book();

        $formBook = $this->createForm(BookFormType::class, $newBook);
        $formBook->submit((array)$content);

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

        try {
            $entityManager->persist($newBook);
            $entityManager->flush();
        }
        catch (\Exception) {
            return $this->json([
                'message' => ['content' => 'Une erreur s\'est produite.', 'level' => 'error']
            ],403, []);

        }
        return $this->json([
            'book'    => $newBook->toArray(),
            'message' => ['content' => 'Votre livre a bien été créé', 'level' => 'success']
        ], 201, [], ['groups' => 'book.show']);

    }

    #[Route('api/v1/beta/book/{id}/edit', name: 'app_api_book_edit', methods: ['GET', 'PUT'])]
    public function bookEdit
        (
            $id,
            BookRepository $bookRepository,
            Request $request,
            EntityManagerInterface $entityManager
        ): Response
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
        $content = json_decode($request->getContent());

        $formBook = $this->createForm(BookFormType::class, $book);
        $formBook->submit((array)$content);

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

        try {
            $entityManager->persist($book);
            $entityManager->flush();
        }
        catch (\Exception) {
            return $this->json([
                'message' => ['content' => 'Une erreur s\'est produite.', 'level' => 'error']
            ],403, []);

        }
        return $this->json([
            'book'    => $book->toArray(),
            'message' => ['content' => 'Votre livre a bien été modifié', 'level' => 'success']
        ], 201, [], ['groups' => 'book.show']);

    }

    #[Route('api/v1/beta/book/{id}/delete', name: 'app_api_book_delete', methods: ['GET', 'DELETE'])]
    public function bookDelete
        (
            $id,
            BookRepository $bookRepository,
            EntityManagerInterface $entityManager
        ): Response
    {
        $book = $bookRepository->findOneBy([
            'id' => $id
        ]);

        try {
            $entityManager->persist($book);
            $entityManager->flush();
        }
        catch (\Exception) {
            return $this->json([
                'message' => ['content' => 'Une erreur s\'est produite.', 'level' => 'error']
            ],403, []);

        }

        return $this->json([
            'message' => [
                'content' => 'Votre livre a bien été supprimé',
                'level' => 'success'
            ]],
        200, []);
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
