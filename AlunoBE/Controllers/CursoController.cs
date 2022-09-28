using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/controller/cursos")]
    [ApiController]
    public class CursoController : Controller
    {
        private EscolaContext _context;
        public CursoController(EscolaContext context) {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Curso>> GetAll(){
            return _context.Curso.ToList();
        }

        //Trazer um unico Curso Pasando o ID do Mesmo
        [HttpGet("{CursoId}")]
        public ActionResult<List<Curso>> Get (int CursoId){
            try{
                var result = _context.Aluno.Find(CursoId);
                if(result == null)
                    return NotFound();
                return Ok(result);
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao Tentar Acessar o Banco de Dados");
            }
        }

         //Inserindo um Curso no banco de Dados
        [HttpPost]
        public async Task<ActionResult> post (Curso model) {
            try{
                _context.Curso.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                    return Created($"/api/curso/{model.codCurso}", model);
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao Tentar Acessar o Banco de Dados");
            }
            //Caso os Comandos Acima não Funcionen ele Retornar uma BadRequest.
            return BadRequest();
        }
        
         //Deletando um Aluno do Banco passando o id
        [HttpPut("{CursoId}")]
        public async Task<IActionResult> put (int CursoId, Curso dadosCursoAlt){
            try{
                var result = await _context.Curso.FindAsync(CursoId);
                if(CursoId != result.id)
                    return BadRequest();

                result.codCurso = dadosCursoAlt.codCurso;
                result.nomeCurso = dadosCursoAlt.nomeCurso;
                result.periodo = dadosCursoAlt.periodo;
                await _context.SaveChangesAsync();
                return Created($"/api/curso/{dadosCursoAlt.codCurso}", dadosCursoAlt);
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao Tentar Acessar o Banco de Dados");
            }
        }
        
         //Deletando Um Curso do Banco de Dados
        [HttpDelete("{CursoId}")]
        public async Task<ActionResult> delete(int CursoId) {
            try{
                var curso = await _context.Curso.FindAsync(CursoId);
                if(curso == null)
                    return NotFound();

                _context.Remove(curso);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao Tentar Acessar o Banco de Dados");
            }
        }
    }
}
