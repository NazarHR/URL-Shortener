using Microsoft.EntityFrameworkCore;
using URL_Shortener.Models;

namespace URL_Shortener.Data
{
    public class URLShortenerDbContext : DbContext
    {
        public URLShortenerDbContext(DbContextOptions options) : base(options){}
        public DbSet<ShortenedURLDetails> ShortenedURLDetails { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShortenedURLDetails>()
                .HasIndex(URLDetail => URLDetail.OriginalUrl)
                .IsUnique(true);
            modelBuilder.Entity<UserModel>()
                .HasIndex(users => users.Username)
                .IsUnique(true);
        }
        public DbSet<UserModel> users { get; set; }
    }
}
