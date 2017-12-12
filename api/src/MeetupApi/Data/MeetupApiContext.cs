using MeetupApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MeetupApi.Data
{
    public class MeetupApiContext : DbContext
    {
        public MeetupApiContext(DbContextOptions<MeetupApiContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Meetup>().HasKey(m => m.Id);
            modelBuilder.Entity<Meetup>().Property(m => m.Nome).HasColumnType("VARCHAR(100)");
            modelBuilder.Entity<Meetup>().Property(m => m.Descricao).HasColumnType("VARCHAR(1000)");
            modelBuilder.Entity<Meetup>().Property(m => m.Local).HasColumnType("VARCHAR(150)");

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Meetup> Meetup { get; set; }
    }
}
