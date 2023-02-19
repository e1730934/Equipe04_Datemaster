
using System.ComponentModel.DataAnnotations;

namespace Equipe04_Datemaster.Models;


public class Event
{
    [Required(AllowEmptyStrings = true)]
    [Key] public int FakeId { get; set; }
    [Required(AllowEmptyStrings = true)]
        public string Title { get; set; }
    [Required(AllowEmptyStrings = true)]
    public string Description { get; set; }
    [Required(AllowEmptyStrings = true)]

    public string Location { get; set; }
    [Required(AllowEmptyStrings = true)]
    public string Start_time { get; set; }

    [Required(AllowEmptyStrings = true)]
    public string End_time { get; set; }
    [Required(AllowEmptyStrings = true)]
    public int Organizer_id { get; set; }

    [Required(AllowEmptyStrings = true)]
    public DateTime Created_At { get; set; }
}



// CREATE TABLE Events (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// title TEXT NOT NULL,
// description TEXT,
// location TEXT,
// start_time TEXT NOT NULL,
// end_time TEXT NOT NULL,
// organizer_id INTEGER NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// fakeId INTEGER NOT NULL,
// FOREIGN KEY (organizer_id) REFERENCES Professionals(Id)
// );

// -- Table pour les participants
// CREATE TABLE Participants (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// name TEXT NOT NULL,
// email TEXT NOT NULL,
// event_id INTEGER NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// fakeId INTEGER NOT NULL,
// FOREIGN KEY (event_id) REFERENCES events(id)
// );

// -- Table pour les disponibilités des utilisateurs
// CREATE TABLE Availability (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// start_time TEXT NOT NULL,
// end_time TEXT NOT NULL,
// user_id INTEGER NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// fakeId INTEGER NOT NULL,
// FOREIGN KEY (user_id) REFERENCES Professionals(Id)
// );

