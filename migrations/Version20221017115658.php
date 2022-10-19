<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221017115658 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE kind (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE kind_book (kind_id INT NOT NULL, book_id INT NOT NULL, INDEX IDX_EF95EE8430602CA9 (kind_id), INDEX IDX_EF95EE8416A2B381 (book_id), PRIMARY KEY(kind_id, book_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE kind_book ADD CONSTRAINT FK_EF95EE8430602CA9 FOREIGN KEY (kind_id) REFERENCES kind (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE kind_book ADD CONSTRAINT FK_EF95EE8416A2B381 FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE kind_book DROP FOREIGN KEY FK_EF95EE8430602CA9');
        $this->addSql('ALTER TABLE kind_book DROP FOREIGN KEY FK_EF95EE8416A2B381');
        $this->addSql('DROP TABLE kind');
        $this->addSql('DROP TABLE kind_book');
    }
}
