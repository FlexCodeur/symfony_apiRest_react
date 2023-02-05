<?php

namespace App\Form;

use App\Entity\Author;
use App\Entity\Book;
use App\Entity\Kind;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Unique;

class BookFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank([
                    'message' => 'Saisissez votre titre.'
                    ]),
                    new Length([
                        'min' => 3,
                        'minMessage' => 'Veuillez insérer au moins 3 caractères à votre titre.'
                    ])
                ]
            ])
            ->add('description', TextareaType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Saisissez votre description.'
                    ])
                ]
            ])
            ->add('publishedAt', DateType::class,[
                'widget' => 'single_text',
                'html5' => false,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez saisir votre ISBN'
                    ]),
                ]
            ])
            ->add('isbn', NumberType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez saisir votre ISBN'
                    ]),
//                    new Length([
//                        'min' => 13,
//                        'minMessage' => 'Votre ISBN doit contenir {{ limit }} chiffres',
//                        'max' => 13,
//                        'maxMessage' => 'Votre ISBN doit contenir {{ limit }} chiffres'
//                    ])
                ]
            ])
            ->add('editor', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez saisir votre ISBN'
                    ])
                ]
            ])
            ->add('author', EntityType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez sélectionner votre auteur'
                    ]),
                ],
                'class' => Author::class,
            ])
            ->add('kinds', EntityType::class, [
                'multiple' => true,
                'class' => Kind::class,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez sélectionner le genre'
                    ]),
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Book::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);
    }
}
