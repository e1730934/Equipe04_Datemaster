using System.ComponentModel.DataAnnotations;

namespace Equipe04_Datemaster.Models;

public class Professional
{
  [Required(AllowEmptyStrings = true)] public int FakeId { get; set; }

    public string FirstName { get; set; }

    [Required(AllowEmptyStrings = true)] public string LastName { get; set; }


    [Required(AllowEmptyStrings = true)] public string Address { get; set; }

    [Required] [EmailAddress] public string Email { get; set; }

    public string Password { get; set; }

    public int Phone { get; set; }

    public int Birthdate { get; set; }

    public int Gender { get; set; }

    [Key] [Required(AllowEmptyStrings = true)] public int Id { get; set; }
}

public class ProfessionalLogin
{
    public string Email { get; set; }
    public string Password { get; set; }
}

