<?php

namespace App\Controller\ApiController;

use App\Entity\User;
use App\Form\RegistrationFormType;
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
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route ('api/register', name: 'app_api_register', methods: ['POST'])]
    public function apiRegister
    (
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager
    ) {

        $content = json_decode($request->getContent());

        $user = new User();

        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->submit((array)$content);

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['content' => $errors, 'level' => 'error'],
            ], 401,[]);
        }

        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $form->get('plainPassword')->getData()
            )
        );

        try {
            $entityManager->persist($user);
            $entityManager->flush();
        }
        catch (\Exception) {
            return $this->json([
                'message' => ['content' => 'Une erreur s\'est produite.', 'level' => 'error']
            ],403, []);

        }
        return $this->json([
            'user'    => $user->toArray(),
            'message' => ['content' => 'Votre compte a bien été créé', 'level' => 'success']
        ], 201, []);
    }
}
