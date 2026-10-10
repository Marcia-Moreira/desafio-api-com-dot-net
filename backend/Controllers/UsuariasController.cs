using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;
using GerenciadorTarefas.API.Models;
using System.Formats.Tar;
namespace backend.Controllers;


[ApiController]
[Route("api/[controller]")]

public class UsuariasController : ControllerBase
{
    private readonly AppDbContext _context;
    public UsuariasController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IActionResult> ListarUsuarias()
    {
        var Usuarias = await _context.Usuarias.ToListAsync();
        return Ok(Usuarias);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        if(id <= 0)
        {
            return BadRequest("Id deve ser maior que zero.");
        }
        var Usuaria = await _context.Usuarias.FindAsync(id);
        if(Usuaria == null)
        {
            return NotFound($"Usuaria {id} não encontrada.");
        }
        return Ok(Usuaria);
    }

    [HttpPost]
    public async Task<IActionResult> CriarUsuaria([FromBody] Usuaria usuaria)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _context.Usuarias.Add(usuaria);
        await _context.SaveChangesAsync();
        return Ok($"Usuária {usuaria.Nome} cadastrada.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarUsuaria([FromBody] Usuaria usuariaAtualizada)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var usuaria = await _context.Usuarias.FindAsync(usuariaAtualizada.Id);
        if(usuaria == null)
        {
            return NotFound($"Usuaria {usuariaAtualizada.Nome} não encontrada.");
        }

        usuaria.Nome = usuariaAtualizada.Nome;
        usuaria.Email = usuariaAtualizada.Email;
        usuaria.Senha = usuariaAtualizada.Senha;

        await _context.SaveChangesAsync();
        return Ok($"Informações da usuária {usuariaAtualizada.Nome} atualizadas.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoverUsuaria(int id)
    {
        var usuaria = await _context.Usuarias.FindAsync(id);
        if(usuaria == null)
        {
            return NotFound($"Usuária {id} não encontrada.");   
        }
        var tarefa = await _context.Tarefas.FindAsync(id);
        
        // var query = await _context.Usuarias.Join(
        //     _context.Tarefas,
        //     u => u.Id,
        //     t => t.UsuariaId,
        //     (u, t) => new {id = t.Id}
        //     ).ToListAsync();
        
        // if(query.Count > 0)
        // {
        //     return NotFound("Tarefa associada a Usuária, delete a tarefa antes.");
        // }

        _context.Usuarias.Remove(usuaria);
        await _context.SaveChangesAsync();
        return Ok($"Usuária {id} deletada.");
    }

}