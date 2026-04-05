using Application.Interfaces;
using Domain;
using Domain.Entities;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Core.Services;

public class TokenService(
    AppDbContext _context,
    IConfiguration _configuration,
    UserManager<UserEntity> _userManager) : ITokenService
{
    public async Task<string> CreateTokenAsync(UserEntity user)
    {
        var key = _configuration["Tokens:Jwt:Key"] ?? "";

        var claims = new List<Claim>
        {
            new Claim("id", user.Id.ToString()),
            new Claim("email", user.Email)
        };

        foreach (var role in await _userManager.GetRolesAsync(user))
        {
            claims.Add(new Claim("role", role));
        }

        var keyBytes = Encoding.UTF8.GetBytes(key);
        var symmetricSecurityKey = new SymmetricSecurityKey(keyBytes);

        var signingCredentials = new SigningCredentials(
            symmetricSecurityKey,
            SecurityAlgorithms.HmacSha256);

        var jwtSecurityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
    }

    public async Task<string> GenerateRefreshTokenAsync()
    {
        var refreshToken = new RefreshTokenEntity
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(128)),
            IsRevorked = false
        };

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return refreshToken.Token;
    }

    public async Task RevokeRefreshTokenAsync(string token)
    {
        var refreshToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(x => x.Token == token);

        if (refreshToken != null)
        {
            refreshToken.IsRevorked = true;
            await _context.SaveChangesAsync();
        }
    }
}