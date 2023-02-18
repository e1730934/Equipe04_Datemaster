
using System.ComponentModel.DataAnnotations;

namespace Equipe04_Datemaster.Models;


public class Event
{
    [Key] public int FakeId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    public int OrganizerId { get; set; }
    public DateTime CreatedAt { get; set; }
}
