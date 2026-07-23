export function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
        try {
          const stored = localStorage.getItem('nebulax-theme')
          const theme = stored ? JSON.parse(stored).state.theme : 'dark'
          document.documentElement.setAttribute('data-theme', theme)
        } catch {}
      `,
            }}
        />
    );
}
