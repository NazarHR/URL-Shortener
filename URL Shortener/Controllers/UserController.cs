using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using URL_Shortener.Data;
using URL_Shortener.Models;

namespace URL_Shortener.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly URLShortenerDbContext _context;
        public UserController(URLShortenerDbContext context)
        {
            _context = context;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserModel userObj)
        {
            if(userObj == null ){
                return BadRequest();
            }
            UserModel user = await _context.users.FirstOrDefaultAsync(u=> u.Username== userObj.Username && u.Password==userObj.Password);
            if(user == null)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUSer([FromBody] UserModel userObj)
        {
            if (userObj == null ){
                return BadRequest();
            }
            UserModel user = await _context.users.FirstOrDefaultAsync(u => u.Username == userObj.Username);
            if(user != null)
            {
                return BadRequest();
            }
            await _context.users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok();
            
        }

    }
    
}
