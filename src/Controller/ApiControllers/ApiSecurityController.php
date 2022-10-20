<?php

namespace App\Controller\ApiControllers;

use App\Entity\User;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class ApiSecurityController extends AbstractController {

    #[Route ('api/login', name: 'app_api_login', methods: ['POST'])]
    public function apiLogin() {

        $user = $this->getUser();

        return $this->json([
            'username' => $user->getUsername(),
            'roles' => $user->getRoles()
        ]);
    }

    #[Route ('api/register', name: 'app_api_register', methods: ['POST'])]
    public function apiRegister(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager
    ) {

        $content = json_decode($request->getContent());

        $user = new User();

        $user->setEmail($content->email);
        $user->setUsername($content->username);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $content->password
            )
        );

        try {
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (UniqueConstraintViolationException) {
            return $this->json([
                'message' => ['content' => 'Une erreur s\'est produite.', 'level' => 'error']
            ]);

        }
        return $this->json([
            'user'    => $user->toArray(),
            'message' => ['content' => 'Votre compte a bien été créé', 'level' => 'success']
        ]);
    }
}
