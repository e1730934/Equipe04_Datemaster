using Equipe04_Datemaster.Models;
using Microsoft.EntityFrameworkCore;

namespace Equipe04_Datemaster;

public class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DbContext(DbContextOptions<DbContext> options) : base(options)
    {
    }

    public DbSet<Professional> Professionals { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<Participants> Participants { get; set; }
    
    public DbSet<Availability> Availabilities { get; set; }
    
}