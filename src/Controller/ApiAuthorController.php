<?php

namespace App\Controller;

use App\Repository\AuthorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiAuthorController extends AbstractController
{
    #[Route('/api/authors', name: 'app_api_authors')]
    public function authorList(AuthorRepository $authorRepository): Response
    {
        $authors = $authorRepository->findAll();

        return $this->json($authors, 200, [], ['groups' => 'author:read']);
    }
}
