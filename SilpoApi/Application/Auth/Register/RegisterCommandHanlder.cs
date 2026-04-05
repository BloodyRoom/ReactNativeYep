using Application.Auth.Login;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Application.Auth.Register;

public class RegisterCommandHanlder(UserManager<UserEntity> userManager)
    : IRequestHandler<RegisterCommand>
{
    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user != null)
        {
            throw new Exception("Email is registered");
        }

        user = new UserEntity
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email
        };

        var newUser = await userManager.CreateAsync(user, request.Password);
        if (!newUser.Succeeded)
        {
            var e = newUser.Errors.ToList()[0];

            throw new Exception(e.Description);
        }
    }
}
