# auto-console

Cuando la ventana de 5 horas de tu suscripción de Claude llega al 99 %, este mod te avisa y `claude-eco`
retoma la **misma conversación** con tu cuenta de Console (pago por uso) en Sonnet 5.5.

## Instalar

1. El mod, dentro de Claude Code:

```
/plugin install auto-console --marketplace nicoherrera524-byte/cluadeconsoleauto
```

Responde `y` para añadir el marketplace y elige el ámbito de usuario.

2. El script. Cópialo a una carpeta de tu PATH (por ejemplo `~/bin`) y dale permiso:

```
mkdir -p ~/bin && curl -fsSL https://raw.githubusercontent.com/nicoherrera524-byte/cluadeconsoleauto/main/bin/claude-eco -o ~/bin/claude-eco && chmod +x ~/bin/claude-eco
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
```

3. Login de Console, una sola vez, en una carpeta de configuración aparte:

```
CLAUDE_CONFIG_DIR=~/.claude-console claude
```

Elige **Anthropic Console account**, inicia sesión y acepta la confianza de la carpeta. Sal con `/exit`.

## Usar

Abre las sesiones con `claude-eco` en lugar de `claude`. Una sesión abierta con `claude` normal solo recibe el aviso.

## Ajustes

- Modelo: `ECO_MODEL` (por defecto `claude-sonnet-5-5`).
- Carpeta de Console: `ECO_CONFIG_DIR` (por defecto `~/.claude-console`).
- Umbral: `THRESHOLD` en `hooks/register.ts` (por defecto 99).

Un mod no puede cambiar de cuenta con la sesión en marcha: por eso el script cierra y reabre con `--resume`, y el turno en curso se corta.
