package io.github.dougllasfps.agenda.model.api.rest;

import io.github.dougllasfps.agenda.model.entity.Contato;
import io.github.dougllasfps.agenda.model.repository.ContatoRepository;
import jakarta.servlet.http.Part;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ContatoController {

    private final ContatoRepository repository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save(@RequestBody Contato contato ) {
        return repository.save(contato);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete( @PathVariable Integer id) {
        repository.deleteById(id);
    }

    @GetMapping
    public Page<Contato> list(
            @RequestParam(value="page", defaultValue = "0") Integer pagina,
            @RequestParam(value="size", defaultValue = "10") Integer tamanhoPagina
    ) {
        PageRequest pageRequest = PageRequest.of(pagina,tamanhoPagina);
        return repository.findAll(pageRequest);
    }

    @PatchMapping("{id}/favorito")
    public Contato favorite(@PathVariable Integer id) {
        Contato c = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contato não encontrado"));

        c.setFavorito(!c.isFavorito());
        return repository.save(c);
    }

    @PutMapping("{id}/foto")
    public byte[] addPhoto(@PathVariable Integer id,
                           @RequestParam("foto") Part arquivo ) {
        Optional<Contato> contato = repository.findById(id);
        return contato.map( c -> {
            try{
                InputStream is = arquivo.getInputStream();
                byte[] bytes = new byte[(int)arquivo.getSize()];
                IOUtils.readFully(is, bytes);
                c.setFoto(bytes);
                repository.save(c);
                is.close();
                return bytes;
            } catch (IOException e) {
                return null;
            }
        }).orElse(null);
    }
}
