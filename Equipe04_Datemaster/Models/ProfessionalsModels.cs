using System.ComponentModel.DataAnnotations;

namespace Equipe04_Datemaster.Models;

public class Professional
{
    [Key] public int FakeId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Address { get; set; }

    [Required] [EmailAddress] public string Email { get; set; }

    public string Password { get; set; }

    public int Phone { get; set; }

    public int Birthdate { get; set; }

    public int Gender { get; set; }

    [Required(AllowEmptyStrings = true)]
    public int Id { get; set; }
}

