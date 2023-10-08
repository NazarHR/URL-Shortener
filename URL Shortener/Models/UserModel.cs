using System.ComponentModel.DataAnnotations;

namespace URL_Shortener.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
