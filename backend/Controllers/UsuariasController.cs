using Microsoft.AspNetCore.Mvc;
using GerenciadorTarefas.API.UsuariasModels;
using GerenciadorTarefas.API.UsuariasServices;

namespace GerenciadorTarefas.API.UsuariasControllers;

[ApiController]
[Route("api/[controller]")]

public class UsuariasController : ControllerBase
{
   private readonly IUsuariasService _service;
    public UsuariasController(IUsuariasService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<IActionResult> ListarUsuarias()
    {
        try
        {
            var usuarias = await _service.ListarUsuariasAsync();
            return Ok(usuarias);
        }
        catch(Exception)
        {
            return StatusCode(500, $"Ocorreu um erro ao listar as usuárias.");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        try
        {
            var usuaria = await _service.BuscarPorIdAsync(id);
            if(usuaria == null)
            {
                return NotFound($"Usuária {id} não encontrada.");
            }
            return Ok(usuaria);
        }
        catch(Exception)
        {
            return StatusCode(500, $"Ocorreu um erro ao buscar a usuária {id}.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CriarUsuaria([FromBody] Usuaria usuaria)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var usuariaCriada = await _service.CriarUsuariaAsync(usuaria);
            return CreatedAtAction(nameof(BuscarPorId), new {id = usuariaCriada.Id}, usuariaCriada);
        }
        catch(ArgumentException ex)
        {
            return BadRequest(ex);
        }
        catch(Exception)
        {
            return StatusCode(500, $"Ocorreu um erro ao criar a usuária {usuaria.Nome}.");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarUsuaria([FromBody] Usuaria usuariaAtualizada)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try 
        {
            var usuaria = await _service.AtualizarUsuariaAsync(usuariaAtualizada);
            if(usuaria == null)
            {
                return NotFound($"Usuária {usuariaAtualizada.Nome} não encontrada.");
            }
            return Ok($"Informações da usuária {usuariaAtualizada.Nome} atualizadas.");
        }
        catch(Exception)
        {
            return StatusCode(500, $"Ocorreu um erro ao atualizar a usuária {usuariaAtualizada.Nome}.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoverUsuaria(int id)
    {
        try
        {
            var removida = await _service.RemoverUsuariaAsync(id);
            if (!removida)
            {
                return NotFound(new { mensagem = $"Usuária com ID {id} não foi encontrada para remoção." });
            }

            return NoContent(); // 204 No Content para exclusões bem-sucedidas
        }
        catch (Exception)
        {
            return StatusCode(500, new { mensagem = "Ocorreu um erro interno ao remover a usuária." });
        }
    }
}