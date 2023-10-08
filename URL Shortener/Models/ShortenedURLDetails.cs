using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace URL_Shortener.Models
{
    public class ShortenedURLDetails
    {
        [Key]
        public uint id {  get; set; }
        public string? OriginalUrl { get; set; }
        public string? ShortenedUrl { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
