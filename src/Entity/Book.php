<?php

namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(groups : ['books.list', 'book.show', 'authors.list', 'kinds.list'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(groups : ['books.list', 'book.show', 'authors.list', 'kinds.list'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(groups : ['books.list', 'book.show', 'authors.list'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(groups : ['books.list', 'book.show', 'authors.list'])]
    private ?\DateTime $publishedAt = null;

    #[ORM\Column(length: 13)]
    #[Groups(groups : ['books.list', 'book.show', 'authors.list'])]
    private ?string $isbn = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(groups : ['books.list', 'book.show', 'authors.list'])]
    private ?string $editor = null;

    #[ORM\ManyToOne(inversedBy: 'books')]
    #[Groups(groups : ['books.list', 'book.show'])]
    private ?Author $author = null;

    #[Groups(groups : ['books.list'])]
    #[ORM\ManyToMany(targetEntity: Kind::class, mappedBy: 'books')]
    private Collection $kinds;

    public function __construct()
    {
        $this->kinds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPublishedAt(): ?\DateTime
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(?\DateTime $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }

    public function getIsbn(): ?string
    {
        return $this->isbn;
    }

    public function setIsbn(string $isbn): self
    {
        $this->isbn = $isbn;

        return $this;
    }

    public function getEditor(): ?string
    {
        return $this->editor;
    }

    public function setEditor(?string $editor): self
    {
        $this->editor = $editor;

        return $this;
    }

    public function getAuthor(): ?Author
    {
        return $this->author;
    }

    public function setAuthor(?Author $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection<int, Kind>
     */
    public function getKinds(): Collection
    {
        return $this->kinds;
    }

    public function addKind(Kind $kind): self
    {
        if (!$this->kinds->contains($kind)) {
            $this->kinds->add($kind);
            $kind->addBook($this);
        }

        return $this;
    }

    public function removeKind(Kind $kind): self
    {
        if ($this->kinds->removeElement($kind)) {
            $kind->removeBook($this);
        }

        return $this;
    }

    public function toArray() :array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'publishedAt' => $this->publishedAt,
            'isbn' => $this->isbn,
            'editor' => $this->editor,
            'author' => $this->author,
            'kinds' => $this->kinds
        ];
    }
}
