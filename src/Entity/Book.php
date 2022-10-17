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
    #[Groups(groups : ['book.show', 'author.show', 'kind.show'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(groups : ['book.show', 'author.show', 'kind.show'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(groups : ['book.show', 'author.show', 'kind.show'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(groups : ['book.show', 'author.show', 'kind.show'])]
    private ?\DateTimeInterface $publishedAt = null;

    #[ORM\Column(length: 13)]
    #[Groups(groups : ['book.show', 'author.show', 'kind.show'])]
    private ?string $isbn = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(groups : ['book.show', 'author.show', 'kind.show'])]
    private ?string $editor = null;

    #[ORM\ManyToOne(inversedBy: 'books')]
    #[Groups(groups : ['book.show'])]
    private ?Author $author = null;

    #[Groups(groups : ['book.show'])]
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

    public function getPublishedAt(): ?\DateTimeInterface
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(\DateTimeInterface $publishedAt): self
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
}
