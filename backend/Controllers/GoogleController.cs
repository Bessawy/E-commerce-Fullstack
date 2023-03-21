using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ecommerce.Models;
using Ecommerce.Services;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Ecommerce.DTOs;
using Google.Apis.Auth;

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

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserSignInResponseDTO>> GoogleResponse(GoogleDTO request)
    {
        Console.WriteLine("dude");
        // varify given user credentials
        var payload = GoogleJsonWebSignature
         .ValidateAsync(request.Credential, new GoogleJsonWebSignature.ValidationSettings()).Result;

        if (payload is null)
            return Unauthorized();

        // return access_token
        return await _service.GoogleLogInAsync(payload);;
    }
}