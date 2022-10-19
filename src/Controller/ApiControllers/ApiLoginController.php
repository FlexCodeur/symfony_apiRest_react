<?php

namespace App\Controller\ApiControllers;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiLoginController extends AbstractController {

    #[Route ('api/login', name: 'app_api_login', methods: ['POST'])]
    public function apiLogin() {

        $user = $this->getUser();

        return $this->json([
            'username' => $user->getUsername(),
            'roles' => $user->getRoles()
        ]);
    }
}
