
using System.ComponentModel.DataAnnotations;

namespace Equipe04_Datemaster.Models;


public class Participants{
    [Key] public int FakeId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int Event_id { get; set; }
    public DateTime Created_At { get; set; }

    
    [Required(AllowEmptyStrings = true)]
    public int Id { get; set; }
}