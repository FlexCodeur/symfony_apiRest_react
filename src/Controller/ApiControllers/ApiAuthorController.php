<?php

namespace App\Controller\ApiControllers;

use App\Entity\Author;
use App\Repository\AuthorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiAuthorController extends AbstractController
{

    #[Route('api/v1/beta/authors', name: 'app_api_authors_list',methods: ['GET'])]
    public function authorList(AuthorRepository $authorRepository): Response
    {
        $authors = $authorRepository->findAll();

        return $this->json($authors, 200, ['Access-Control-Allow-Origin' => '*'], ['groups' => 'authors.list']);
    }

    #[Route('api/v1/beta/author/{id}', name: 'app_api_authors_show', methods: ['GET'])]
    public function authorShow(Author $author): Response
    {
        return $this->json($author, 200, ['Access-Control-Allow-Origin' => '*'], ['groups' => 'author.show']);
    }
}
