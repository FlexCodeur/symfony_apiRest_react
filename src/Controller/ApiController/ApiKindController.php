<?php

namespace App\Controller\ApiController;

use App\Entity\Kind;
use App\Repository\KindRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiKindController extends AbstractController
{

    #[Route('api/v1/beta/kinds', name: 'app_api_kind_list', methods: ['GET'])]
    public function kindList(KindRepository $kindRepository): Response
    {
        $kinds = $kindRepository->findAll();

        return $this->json($kinds, 200, [], ['groups' => 'kinds.list']);
    }

    #[Route('api/v1/beta/kind/{id}', name: 'app_api_kind_show', methods: ['GET'])]
    public function kindShow(Kind $kind): Response
    {

        return $this->json($kind, 200, [], ['groups' => 'kind.show']);
    }

}
