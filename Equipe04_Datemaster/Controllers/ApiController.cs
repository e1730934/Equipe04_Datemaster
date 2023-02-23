using Equipe04_Datemaster.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        var existingProfessional = await _context.Professionals.FirstOrDefaultAsync(x =>
            x.Email == professional.Email || x.FakeId == professional.FakeId);

        if (existingProfessional != null)
            return BadRequest(new { message = "Professional already exists" }); // 400
            else
            {
                _context.Professionals.Add(professional);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Professional created successfully", professional }); // 200
            }

            
        
        
        
    }

    // [HttpPost] // route: api/Api/LoginProfessional (fait comme en  haut c un post aussi)
    [HttpPost]
    public async Task<IActionResult> LoginProfessional([FromForm] ProfessionalLogin professionalData)
    {
        var professional = await _context.Professionals.FirstOrDefaultAsync(x =>
            x.Email == professionalData.Email && x.Password == professionalData.Password);
        if (professional == null)
            return Unauthorized(new { message = "Username or password is incorrect" }); // 401

        return Ok(new { message = "Professional logged in successfully", professional }); // 200
    }


    //(GET) Voir les evenements d'un professionnel (avec son id)
    // route: api/Api/GetEvents/:professionalId
    [HttpGet("{professionalId}")]
    public async Task<IActionResult> GetEvents(int professionalId)
    {
        try
        {
            var events = await _context.Events.AsNoTracking()
                .Where(e => e.Organizer_id == professionalId)
                .OrderBy(e => e.Start_time)
                .ToListAsync();

            if (events.Count == 0)
            {
                return NotFound(new { message = "Aucun événement trouvé" }); // 404
            }
            else
            {
                return Ok(new { message = "Événements récupérés avec succès", events }); // 200
            }
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Une erreur s'est produite lors de la récupération des événements", error = ex.Message });
        }
    }



    //(POST) Créer un evenement [FromForm]
    // route: api/Api/CreateEvent
    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromForm] Event eventData)
    {
        try
        {
            var newEvent = new Event
            {
                Title = eventData.Title,
                Description = eventData.Description,
                Location = eventData.Location,
                Start_time = eventData.Start_time,
                End_time = eventData.End_time,
                Organizer_id = eventData.Organizer_id,
                FakeId = eventData.FakeId
            };

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event created successfully", newEvent }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while creating event", error = ex.Message });
        }
    }


    //(PATCH) Modifier un evenement [FromForm]
    // route: api/Api/UpdateEvent
    [HttpPut]
    public async Task<IActionResult> UpdateEvent([FromForm] Event eventData)
    {
        try
        {
            var existingEvent =
                await _context.Events.FirstOrDefaultAsync(x => x.Organizer_id == eventData.Organizer_id);


            if (existingEvent == null)
                return NotFound(new { message = "Event not found" }); // 404


            existingEvent.Title = eventData.Title ?? existingEvent.Title;
            existingEvent.Description = eventData.Description ?? existingEvent.Description;
            existingEvent.Location = eventData.Location ?? existingEvent.Location;
            existingEvent.Start_time = eventData.Start_time ?? existingEvent.Start_time;
            existingEvent.End_time = eventData.End_time ?? existingEvent.End_time;

            _context.Entry(existingEvent).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event updated successfully", existingEvent }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating event", error = ex.Message });
        }
    }


    //(DELETE) Supprimer un evenement [FromForm]
    // route: api/Api/DeleteEvent
    [HttpDelete]
    public async Task<IActionResult> DeleteEvent([FromForm] int professionalId)
    {
        try
        {
            var existingEvent = await _context.Events.FirstOrDefaultAsync(x => x.Organizer_id == professionalId);

            if (existingEvent == null)
                return NotFound(new { message = "Event not found" }); // 404

            _context.Events.Remove(existingEvent);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event deleted successfully" }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting event", error = ex.Message });
        }
    }


    //(POST) Ajouter un participant a un evenement [FromForm]
    // route: api/Api/AddParticipant

    [HttpPost]
    public async Task<IActionResult> AddParticipant([FromForm] Participants participantData)
    {
        var newParticipant = new Participants
        {
            Name = participantData.Name,
            Email = participantData.Email,
            Event_id = participantData.Event_id,
            FakeId = participantData.FakeId
        };

        _context.Participants.Add(newParticipant);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Participant added successfully", newParticipant }); // 200
    }


    //(GET) Voir les participants d'un evenement [FromForm]
    // route: api/Api/GetParticipants
    [HttpGet]
    public async Task<IActionResult> GetParticipants([FromForm] int eventId)
    {
        try
        {
            var participants = await _context.Participants.Where(x => x.Event_id == eventId).ToListAsync();
            if (participants.Count == 0)
                return NotFound(new { message = "No participants found" }); // 404
            else
                return Ok(new { message = "Participants retrieved successfully", participants }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving participants", error = ex.Message });
        }
    }


    //(DELETE) Supprimer un participant d'un evenement [FromForm]
    // route: api/Api/DeleteParticipant
    [HttpDelete]
    public async Task<IActionResult> DeleteParticipant([FromForm] int participantId)
    {
        try
        {
            var existingParticipant = await _context.Participants.FirstOrDefaultAsync(x => x.Id == participantId);

            if (existingParticipant == null)
                return NotFound(new { message = "Participant not found" }); // 404

            _context.Participants.Remove(existingParticipant);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Participant deleted successfully" }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting participant", error = ex.Message });
        }
    }


//(GET) Les infos du professionel /professional/:idProfessional

    [HttpGet("{idProfessional}")]
    public async Task<IActionResult> GetProfessional(int idProfessional)
    {
        try
        {
            var professional = await _context.Professionals.FirstOrDefaultAsync(x => x.Id == idProfessional);
            if (professional == null)
                return NotFound(new { message = "Professional not found" }); // 404
            else
                return Ok(new { message = "Professional retrieved successfully", professional }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving professional", error = ex.Message });
        }

    }
    
    //(GET) Voir les disponibilités : https://localhost:7087/api/Api/GetAvailability/:idAvailabilities
    [HttpGet("{idAvailabilities}")]
    public async Task<IActionResult> GetAvailability(int idAvailabilities)
    {
        try
        {
            var availability = await _context.Availabilities.FirstOrDefaultAsync(x => x.Id == idAvailabilities);
            if (availability == null)
                return NotFound(new { message = "Availability not found" }); // 404
            else
                return Ok(new { message = "Availability retrieved successfully", availability }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving availability", error = ex.Message });
        }
    }
    
    [HttpPost]
    
    public async Task<IActionResult> PostAvailability([FromForm] Availability availabilityData)
    {
        try
        {
            var newAvailability = new Availability
            {
                Start_time = availabilityData.Start_time,
                End_time = availabilityData.End_time,
                User_id = availabilityData.User_id,
                Created_At = availabilityData.Created_At,
                FakeId = availabilityData.FakeId
            };
            _context.Availabilities.Add(newAvailability);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Availability created successfully", newAvailability }); // 200
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while creating availability", error = ex.Message });
        }
    }
}