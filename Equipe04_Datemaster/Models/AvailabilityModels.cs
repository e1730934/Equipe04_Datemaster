using System.ComponentModel.DataAnnotations;

namespace Equipe04_Datemaster.Models;

public class Availability
{

    [Key] public int Id { get; set; }
    public string Start_time { get; set; }
    public string End_time { get; set; }
    public int User_id { get; set; }
    public string Created_At { get; set; }
    public int FakeId { get; set; }
}