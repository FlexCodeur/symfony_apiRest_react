<?php

namespace App\Controller;

use App\Repository\AuthorRepository;
use App\Repository\BookRepository;
use App\Repository\KindRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('api/v1/beta')]
class ApiController extends AbstractController
{

    #[Route('/books', name: 'app_api_book_list', methods: ['GET'])]
    public function bookList(BookRepository $bookRepository): Response
    {
        $books = $bookRepository->findAll();

        return $this->json($books, 200, [], ['groups' => 'book.show']);
    }

    #[Route('/kinds', name: 'app_api_kind_list', methods: ['GET'])]
    public function kindList(KindRepository $kindRepository): Response
    {
        $kinds = $kindRepository->findAll();

        return $this->json($kinds, 200, [], ['groups' => 'kind.show']);
    }

    #[Route('/authors', name: 'app_api_authors_list')]
    public function authorList(AuthorRepository $authorRepository): Response
    {
        $authors = $authorRepository->findAll();

        return $this->json($authors, 200, [], ['groups' => 'author.show']);
    }
}
