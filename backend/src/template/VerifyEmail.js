export function verifyEmailTemplate(url = "#") {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Verifica tu correo</title>
</head>
<body style="background-color:#0a0a0a; font-family:Arial, sans-serif; padding:40px 0; color:#ffffff; margin:0;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <table width="420" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#111111; border-radius:16px; overflow:hidden;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:32px 0;">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxTcGFjZT0icHJlc2VydmUiIGVuYWJsZUJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sbnNYbGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIj4KCiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBhdGggaWQ9InN2Z18xIiBkPSJtMTQuNTI5OCw2My4xNzMzbDYuNzUsLTMyLjAybDEwLjc5LDAuMDJsMTAuNzEsMTcuOTQsNC42NywtMTcuOTVsNDEuNzksLTAuMjRsLTIuMjUsOC44bC0zMS4xMSwwbC01LjUyLDIzLjQ1bC0xMi41NCwwbC05LjM1LC0xNy4wM2wtNC4xMSwxNy4yNWwtOS44MywtMC4yMnoiIHN0cm9rZUxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlTGluZWpvaW49Im1pdGVyIiBzdHJva2VXaWR0aD0iMSIgZmlsbFJ1bGU9Im5vbnplcm8iIHN0cm9rZU9wYWNpdHk9IjEiIGZpbGxPcGFjaXR5PSIxIiBzdHJva2U9IiNmZmYiIGZpbGw9IiNmZmYiLz4KICA8cGF0aCBpZD0ic3ZnXzIiIGQ9Im01NC45ODk4LDYzLjIwMzNsMy45NSwtMTguMDJsMjQuMTUsMGwtMi43NCw4LjY1bC0xNC42OSwwbC0yLjQ3LDkuMzdsLTguMiwweiIgc3Ryb2tlTGluZWNhcD0ic3F1YXJlIiBzdHJva2VMaW5lam9pbj0ibWl0ZXIiIHN0cm9rZVdpZHRoPSIxIiBmaWxsUnVsZT0ibm9uemVybyIgc3Ryb2tlT3BhY2l0eT0iMSIgZmlsbE9wYWNpdHk9IjEiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iI2ZmZiIvPgogIDxwYXRoIGlkPSJzdmdfMyIgZD0ibTcuMDU1Nyw3Mi41ODYxbDUsLTMuNjJsMTMuMzMsLTAuOThsMTQuODcsLTAuNzJsMjEuNDYsLTAuNzRsMzEuMDUsLTAuNGwtODUuNzEsNi40NnoiIHN0cm9rZUxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlTGluZWpvaW49Im1pdGVyIiBzdHJva2VXaWR0aD0iMC4zIiBmaWxsUnVsZT0ibm9uemVybyIgc3Ryb2tlT3BhY2l0eT0iMSIgZmlsbE9wYWNpdHk9IjEiIHN0cm9rZT0iI2UzMWQyNiIgZmlsbD0iI2UzMWQyNiIvPgogPC9nPgo8L3N2Zz4=" 
                width="80" 
                height="auto" 
                style="display:block; margin:0 auto; border-radius:8px;" 
                alt="Logo"
              />
            </td>
          </tr>

          <!-- Mensaje -->
          <tr>
            <td align="center" style="padding:0 32px;">
              <h2 style="color: whitesmoke; font-size:18px; font-weight:600; margin:0;">Verifica tu correo</h2>
              <p style="color:#a3a3a3; font-size:14px; margin-top:12px;">Usa el siguiente enlace para confirmar tu cuenta.</p>
            </td>
          </tr>

          <!-- Botón -->
          <tr>
            <td align="center" style="padding:24px 32px;">
              <a href="${url}" style="background-color:#dc2626; color:#ffffff; padding:12px 20px; border-radius:8px; font-size:14px; font-weight:500; text-decoration:none; display:inline-block;">Verificar correo</a>
            </td>
          </tr>

          <tr>
            <td>
              <hr style="border-color:#222; margin:24px 0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:0 32px 32px;">
              <p style="font-size:12px; color:#737373; margin:0;">Este enlace expirará en 15 minutos.</p>
              <p style="font-size:12px; color:#525252; margin-top:6px;">Si no solicitaste esto, puedes ignorar este mensaje.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}