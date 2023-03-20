using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ecommerce.Models;
using Ecommerce.Services;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Ecommerce.DTOs;

namespace Ecommerce.Controllers;

[Route("api/v1/google")]
public class GoogleController : ApiControllerBase
{   
    private readonly ILogger<GoogleController> _logger;
    private readonly SignInManager<User> _signInManage;
    private readonly IUserService _service;
    
    public GoogleController(SignInManager<User> signInManager, 
        ILogger<GoogleController> logger, IUserService service)
    {
        _logger = logger;
        _signInManage = signInManager;
        _service = service;
    }

    [Route("signin")]
    [Authorize(Policy = "google")]
    public async Task<ActionResult<UserSignInResponseDTO>> GoogleResponse()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if(identity == null)
            return Unauthorized();
        
        // Extract user info from google authentication claim
        var output = identity.Claims.Select(claim => new
        {
            name = identity.FindFirst(ClaimTypes.Name)!.Value,
            email = identity.FindFirst(ClaimTypes.Email)!.Value
        });

        var email = output.ToList()[0].email;
        var name = output.ToList()[0].name;
        return await _service.GoogleLogInAsync(email, name);;
    }
}