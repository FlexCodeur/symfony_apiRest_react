<?php

namespace App\DataFixtures;

use App\Entity\Author;
use App\Entity\Book;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\DateTime;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // create 20 products! Bam!
        for ($i = 0; $i < 50; $i++) {
            $book = new Book();
            $book->setTitle('book '.$i);
            $book->setDescription('description ' . $i);
            $book->setPublishedAt(new \DateTime('now'));
            $book->setIsbn('isbn ' . $i);
            $book->setEditor('editor ' . $i);

            $manager->persist($book);
        }

        $manager->flush();
    }
}