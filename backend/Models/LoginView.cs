namespace Ecommerce.Models;

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authentication;

public class LogInViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = null!;

    [Display(Name = "Remember me")]
    public bool RememberMe { get; set; }
    public string ReturnUrl { get; set; } = null!;
    public IList<AuthenticationScheme> ExternalLogins { get; set; } = null!;
}