using Equipe04_Datemaster.Models;
using Microsoft.AspNetCore.Mvc;

namespace Equipe04_Datemaster.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ApiController : ControllerBase
{
    private readonly DbContext _context;

    public ApiController(DbContext context)
    {
        _context = context;
    }

    [HttpGet] // route: api/Api/Test (pour tester si le serveur est en ligne)
    public string Test()
    {
        return "Hello World!";
    }

    [HttpPost] // route: api/Api/SignupProfessional
    public async Task<IActionResult> SignupProfessional([FromForm] Professional professionalData)
    {
        Console.WriteLine(professionalData);

        var professional = new Professional
        {
            FirstName = professionalData.FirstName,
            LastName = professionalData.LastName,
            Address = professionalData.Address,
            Email = professionalData.Email,
            Phone = professionalData.Phone,
            Birthdate = professionalData.Birthdate,
            Gender = professionalData.Gender,
            Password = professionalData.Password,
            FakeId = professionalData.FakeId
        };

        _context.Professionals.Add(professional);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Professional created successfully", professional }); // 200 et sa retourne un json
    }

    // [HttpPost] // route: api/Api/LoginProfessional (fait comme en  haut c un post aussi)
}
