using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities;

public class RefreshTokenEntity
{
    [Key]
    public int Id { get; set; }
    public string Token { get; set; } = string.Empty;
    public bool IsRevorked { get; set; } = false;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}
