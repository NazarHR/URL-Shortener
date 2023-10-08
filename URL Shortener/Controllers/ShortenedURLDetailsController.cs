using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using URL_Shortener.Data;
using URL_Shortener.Models;

namespace URL_Shortener.Controllers
{

    [ApiController]
    public class ShortenedURLDetailsController : ControllerBase
    {
        private readonly URLShortenerDbContext _context;

        public ShortenedURLDetailsController(URLShortenerDbContext context)
        {
            _context = context;
        }
        //GEt: api/shortLInk
        [HttpGet("api/{shortLink}")]
        public async Task<ActionResult<ShortenedURLDetails>> GetRedirectLInk(string shortLink)
        {
            if (_context.ShortenedURLDetails == null)
            {
                return NotFound();
            }
            var DesiredUrlInfo = await _context.ShortenedURLDetails.FirstOrDefaultAsync(linkInfo=>linkInfo.ShortenedUrl== shortLink);
            

            if (DesiredUrlInfo == null)
            {
                return NotFound();
            }
            

            return DesiredUrlInfo;
        }
        // GET: api/ShortenedURLDetails
        [HttpGet]
        [Route("api/short-urls-table")]
        public async Task<ActionResult<IEnumerable<ShortenedURLDetails>>> GetShortenedURLDetails()
        {
          if (_context.ShortenedURLDetails == null)
          {
              return NotFound();
          }
            return await _context.ShortenedURLDetails.ToListAsync();
        }

        // POST: api/short-urls-table
        [HttpPost]
        [Route("api/short-urls-table")]
        public async Task<ActionResult<ShortenedURLDetails>> PostShortenedURLDetails(string actualURL)
        {
            
            if (_context.ShortenedURLDetails == null)
            {
                return Problem("Entity set 'URLShortenerDbContext.ShortenedURLDetails'  is null.");
            }

            uint next_ID = 1;
            try
            {
                next_ID= _context.ShortenedURLDetails.Max(details => details.id) + 1; }
            catch{

            }
            string ShortenedUrl = ShortenURL(next_ID);

            ShortenedURLDetails shortenedURLDetails = new ShortenedURLDetails { OriginalUrl = actualURL, ShortenedUrl = ShortenedUrl, CreatedBy = "", CreatedDate = DateTime.Now };
            try
            {
                _context.ShortenedURLDetails.Add(shortenedURLDetails);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e) when (e?.InnerException?.Message.Contains("Cannot insert duplicate key row in object") ?? false)
            {
                return BadRequest("URL already exists");
            }

            return CreatedAtAction("GetShortenedURLDetails", new { id = shortenedURLDetails.id }, shortenedURLDetails);
        }
        // DELETE: api/short-urls-table/$
        [HttpDelete("api/short-urls-table")]
        public async Task<IActionResult> DeleteShortenedURLDetails()
        {
            if (_context.ShortenedURLDetails == null)
            {
                return NotFound();
            }
            
            _context.Database.ExecuteSqlRaw("TRUNCATE TABLE ShortenedURLDetails"); ;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE: api/short-urls-table/$
        [HttpDelete("api/short-urls-table/{id}")]
        public async Task<IActionResult> DeleteShortenedURLDetails(uint id)
        {
            if (_context.ShortenedURLDetails == null)
            {
                return NotFound();
            }
            var shortenedURLDetails = await _context.ShortenedURLDetails.FindAsync(id);
            if (shortenedURLDetails == null)
            {
                return NotFound();
            }

            _context.ShortenedURLDetails.Remove(shortenedURLDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/short-url-info/$
        [HttpGet("api/short-url-info/{id}")]
        public async Task<ActionResult<ShortenedURLDetails>> GetShortenedURLDetails(uint id)
        {
          if (_context.ShortenedURLDetails == null)
          {
              return NotFound();
          }
            var shortenedURLDetails = await _context.ShortenedURLDetails.FindAsync(id);

            if (shortenedURLDetails == null)
            {
                return NotFound();
            }

            return shortenedURLDetails;
        }

        private string ShortenURL(uint id)
        {
            return WebEncoders.Base64UrlEncode(BitConverter.GetBytes(id));
        }
    }
}
