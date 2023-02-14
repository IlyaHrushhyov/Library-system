using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
           : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Author> Authors { get; set; }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>()
                .HasOne<Author>()
                .WithMany()
                .HasForeignKey(b => b.AuthorId);

            modelBuilder.Entity<Book>()
                .HasOne<Genre>()
                .WithMany()
                .HasForeignKey(b => b.GenreId);

            modelBuilder.Entity<Book>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<Author>().HasData(
                new Author
                {
                    Id = 1,
                    FullName = "Stephen King"
                },
                new Author
                {
                    Id = 2,
                    FullName = "William Shakespeare"
                },
                new Author
                {
                    Id = 3,
                    FullName = "Thomas Wyatt"
                },
                new Author
                {
                    Id = 4,
                    FullName = "Oscar Wilde"
                }
            );
            modelBuilder.Entity<Genre>().HasData(
                new Genre
                {
                    Id = 1,
                    Name = "Adventure"
                },
                new Genre
                {
                    Id = 2,
                    Name = "Detective"
                },
                new Genre
                {
                    Id = 3,
                    Name = "Horror"
                },
                new Genre
                {
                    Id = 4,
                    Name = "Fantasy"
                }
            );
        }
    }
}
