type DoryOgImageProps = {
  title: string;
  description?: string;
  site?: string;
  label?: string;
  logoSrc: string;
  tone?: 'default' | 'docs' | 'release';
};

const palette = {
  page: '#f7f7f3',
  ink: '#26251e',
  muted: '#42526b',
  brandPanel: '#0f172a',
  brandPanel2: '#172033',
  brandSecondary: '#24496f',
  brandAccent: '#6b7f9f',
  warm: '#d2b46f',
  soft: '#e9eef7',
  surface: '#ffffff',
  line: 'rgba(8, 17, 31, 0.12)'
};

export function DoryOgImage({
  title,
  description,
  site = 'Dory',
  label,
  logoSrc,
  tone = 'default'
}: DoryOgImageProps) {
  const isRelease = tone === 'release';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '1200px',
        height: '630px',
        overflow: 'hidden',
        backgroundColor: isRelease ? palette.brandPanel : palette.page,
        color: isRelease ? '#f7f7f4' : palette.ink,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isRelease
            ? `radial-gradient(circle at 20% 20%, rgba(36, 73, 111, 0.72), transparent 30%),
               radial-gradient(circle at 80% 60%, rgba(47, 70, 104, 0.52), transparent 28%),
               linear-gradient(135deg, ${palette.ink}, ${palette.brandPanel2} 62%, ${palette.soft})`
            : `radial-gradient(circle at 72% 18%, rgba(36, 73, 111, 0.08), transparent 34%),
               radial-gradient(circle at 46% 12%, rgba(210, 180, 111, 0.08), transparent 30%),
               linear-gradient(180deg, ${palette.page}, ${palette.page})`
        }}
      />
      {!isRelease ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.62,
            backgroundImage: `linear-gradient(rgba(8, 17, 31, 0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(8, 17, 31, 0.035) 1px, transparent 1px)`,
            backgroundSize: '44px 44px'
          }}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 54,
              height: 54,
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${isRelease ? 'rgba(255,255,255,0.16)' : palette.line}`,
              background: isRelease ? 'rgba(255,255,255,0.08)' : palette.surface,
              overflow: 'hidden'
            }}
          >
            <img
              src={logoSrc}
              alt="Dory"
              width={54}
              height={54}
              style={{
                width: 54,
                height: 54,
                objectFit: 'contain'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 0 }}>
              Dory
            </div>
            <div
              style={{
                marginTop: 2,
                color: isRelease ? 'rgba(247,247,244,0.68)' : palette.muted,
                fontSize: 17,
                fontWeight: 500
              }}
            >
              {site}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            border: `1px solid ${isRelease ? 'rgba(255,255,255,0.18)' : palette.line}`,
            background: isRelease ? 'rgba(255,255,255,0.1)' : palette.soft,
            padding: '10px 16px',
            color: isRelease ? '#f7f7f4' : palette.brandSecondary,
            fontSize: 17,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1.4
          }}
        >
          {label ?? (tone === 'docs' ? 'Docs' : 'AI Native Data Workspace')}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 162,
          display: 'flex',
          width: 660,
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            color: isRelease ? palette.warm : palette.brandAccent,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 0
          }}
        >
          {label ?? site}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 22,
            fontSize: title.length > 42 ? 64 : 74,
            lineHeight: 0.94,
            fontWeight: 750,
            letterSpacing: 0,
            color: isRelease ? '#ffffff' : palette.ink
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              color: isRelease ? '#dbe3ef' : palette.muted,
              fontSize: 28,
              lineHeight: 1.35,
              fontWeight: 500
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 64,
          bottom: 58,
          display: 'flex',
          width: 382,
          height: 330,
          flexDirection: 'column',
          border: `1px solid ${isRelease ? 'rgba(255,255,255,0.14)' : palette.line}`,
          background: isRelease ? 'rgba(255,255,255,0.08)' : palette.surface,
          padding: 18,
          boxShadow: isRelease
            ? '0 34px 100px rgba(0, 0, 0, 0.28)'
            : '0 34px 100px rgba(8, 17, 31, 0.18)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            border: `1px solid ${isRelease ? 'rgba(255,255,255,0.12)' : palette.line}`,
            background: isRelease ? palette.brandPanel : palette.soft,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              display: 'flex',
              height: 48,
              alignItems: 'center',
              gap: 8,
              borderBottom: `1px solid ${isRelease ? 'rgba(255,255,255,0.12)' : palette.line}`,
              padding: '0 16px'
            }}
          >
            {[palette.warm, palette.brandAccent, '#ef6b5b'].map((color) => (
              <div
                key={color}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: color
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flex: 1, padding: 18, gap: 14 }}>
            <div
              style={{
                display: 'flex',
                width: 92,
                flexDirection: 'column',
                gap: 10
              }}
            >
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  style={{
                    height: 16,
                    background:
                      index === 1 ? palette.brandSecondary : 'rgba(107, 127, 159, 0.24)'
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  display: 'flex',
                  height: 70,
                  border: `1px solid ${isRelease ? 'rgba(255,255,255,0.12)' : palette.line}`,
                  background: isRelease ? 'rgba(255,255,255,0.06)' : '#fbfbf7'
                }}
              />
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    height: 24,
                    gap: 8
                  }}
                >
                  <div style={{ flex: 1, background: 'rgba(107, 127, 159, 0.2)' }} />
                  <div style={{ flex: 1, background: 'rgba(107, 127, 159, 0.14)' }} />
                  <div style={{ flex: 1, background: 'rgba(107, 127, 159, 0.2)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          bottom: 42,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: isRelease ? 'rgba(247,247,244,0.62)' : palette.muted,
          fontSize: 18,
          fontWeight: 600
        }}
      >
        <div>getdory.dev</div>
        <div
          style={{
            display: 'flex',
            height: 2,
            width: 220,
            background: isRelease ? 'rgba(255,255,255,0.22)' : palette.line
          }}
        />
      </div>
    </div>
  );
}
