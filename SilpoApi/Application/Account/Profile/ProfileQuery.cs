using Application.Auth.Login;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Account.Profile;

public record ProfileQuery(int id)
    : IRequest<ProfileDto>;