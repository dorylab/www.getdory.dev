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

export function HomeOgImage({
  logoSrc,
  screenshotSrc
}: {
  title: string;
  description?: string;
  logoSrc: string;
  screenshotSrc: string;
}) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '1200px',
        height: '630px',
        overflow: 'hidden',
        background: '#f3f7fb',
        color: '#142033',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 18% 18%, rgba(45, 132, 255, 0.14), transparent 34%), radial-gradient(circle at 82% 8%, rgba(115, 94, 255, 0.1), transparent 28%), linear-gradient(180deg, #fbfdff 0%, #eef4fa 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.58,
          backgroundImage:
            'linear-gradient(rgba(38, 62, 92, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(38, 62, 92, 0.08) 1px, transparent 1px)',
          backgroundSize: '44px 44px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 126,
          display: 'flex',
          width: 1120,
          height: 464,
          overflow: 'hidden',
          borderRadius: 26,
          background: '#111317',
          boxShadow: '0 22px 54px rgba(17, 24, 39, 0.16)'
        }}
      >
        <img
          src={screenshotSrc}
          alt="Dory SQL console"
          width={1120}
          height={464}
          style={{
            width: 1120,
            height: 464,
            objectFit: 'cover',
            objectPosition: 'center top'
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 126,
          display: 'flex',
          width: 1120,
          height: 464,
          borderRadius: 26,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 48%, rgba(5, 6, 8, 0.12) 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 42,
          display: 'flex',
          width: 1200,
          height: 58,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: 7,
              background: '#ffffff',
              boxShadow: '0 10px 30px rgba(25, 74, 128, 0.16)'
            }}
          >
            <img
              src={logoSrc}
              alt="Dory"
              width={30}
              height={30}
              style={{ width: 30, height: 30, objectFit: 'contain' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              lineHeight: 1,
              fontWeight: 850,
              letterSpacing: 0,
              textShadow: '0 12px 40px rgba(32, 80, 130, 0.1)'
            }}
          >
            Dory
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1,
            height: 28,
            background: 'rgba(20, 32, 51, 0.18)'
          }}
        />
        <div
          style={{
            display: 'flex',
            color: 'rgba(20, 32, 51, 0.62)',
            fontSize: 28,
            lineHeight: 1.2,
            fontWeight: 660,
            letterSpacing: 0
          }}
        >
          AI-Native Data Workspace
        </div>
      </div>
    </div>
  );
}

export type BlogOgVariant = 'default' | 'ai-providers';

type BlogOgImageProps = {
  title: string;
  description?: string;
  slug: string;
  category: string;
  logoSrc: string;
  locale?: string;
  variant?: BlogOgVariant;
};

function getBlogOgTerms(title: string, description?: string) {
  const source = `${title} ${description ?? ''}`;
  const tokens = source
    .replace(/[^a-zA-Z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2)
    .filter(
      (word) =>
        ![
          'the',
          'and',
          'for',
          'with',
          'your',
          'from',
          'that',
          'this',
          'into',
          'now',
          'can',
          'while'
        ].includes(word.toLowerCase())
    );

  return Array.from(new Set(tokens))
    .slice(0, 9)
    .map((word) => word.toUpperCase());
}

function getBlogOgTitleSize(title: string) {
  if (title.length > 72) {
    return 48;
  }

  if (title.length > 48) {
    return 56;
  }

  return 66;
}

function DoryBlogOgCard({
  title,
  description,
  slug,
  category,
  logoSrc,
  locale = 'en',
  variant = 'default'
}: BlogOgImageProps) {
  const terms = getBlogOgTerms(title, description);
  const displayTerms =
    terms.length >= 6
      ? terms.slice(0, 4)
      : [
          ...terms,
          'DATABASES',
          'WORKFLOWS',
          'CONTEXT',
          'SQL',
          'AI',
          'DORY'
        ].slice(0, 4);
  const displayTitle = title.length > 88 ? `${title.slice(0, 85)}...` : title;
  const displayDescription =
    description && description.length > 138
      ? `${description.slice(0, 135)}...`
      : description;
  const footerPath =
    slug.length > 46 ? `getdory.dev/blog/${slug.slice(0, 43)}...` : `getdory.dev/blog/${slug}`;
  const isAiProviders = variant === 'ai-providers';
  const signalRows = [
    ['SOURCE', locale.toUpperCase()],
    ['TYPE', category.toUpperCase()],
    ['CONTEXT', isAiProviders ? 'BYOK' : displayTerms[0] ?? 'DORY']
  ];

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '1200px',
        height: '630px',
        overflow: 'hidden',
        background: '#08090b',
        color: '#f8fbff',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            isAiProviders
              ? 'radial-gradient(circle at 14% 18%, rgba(100, 92, 255, 0.22), transparent 28%), radial-gradient(circle at 92% 70%, rgba(42, 168, 255, 0.18), transparent 30%), linear-gradient(135deg, #08090b 0%, #101018 48%, #07101f 100%)'
              : 'radial-gradient(circle at 14% 18%, rgba(57, 151, 255, 0.2), transparent 28%), radial-gradient(circle at 92% 70%, rgba(16, 185, 129, 0.16), transparent 30%), linear-gradient(135deg, #08090b 0%, #101318 48%, #04111c 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -120,
          bottom: -180,
          display: 'flex',
          width: 720,
          height: 420,
          borderRadius: '50%',
          border: '1px solid rgba(42, 168, 255, 0.22)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            'linear-gradient(120deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '26px 26px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 44,
          top: 42,
          display: 'flex',
          width: 1112,
          height: 546,
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: 24,
          background: 'rgba(3, 5, 8, 0.72)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.36)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 76,
          top: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'rgba(248, 251, 255, 0.72)',
          fontSize: 18,
          fontWeight: 720
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: 12,
              background: '#ffffff'
            }}
          >
            <img
              src={logoSrc}
              alt="Dory"
              width={44}
              height={44}
              style={{ width: 44, height: 44, objectFit: 'contain' }}
            />
          </div>
          <div style={{ display: 'flex' }}>Dory Blog</div>
        </div>
        <div
          style={{
            display: 'flex',
            border: '1px solid rgba(42, 168, 255, 0.38)',
            borderRadius: 999,
            padding: '9px 15px',
            color: '#9ed8ff',
            fontSize: 14,
            fontWeight: 760,
            letterSpacing: 1.6,
            textTransform: 'uppercase'
          }}
        >
          {category}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 76,
          top: 132,
          display: 'flex',
          height: 1,
          background: 'linear-gradient(90deg, rgba(42, 168, 255, 0.44), rgba(255,255,255,0.08), rgba(18, 195, 140, 0.32))'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 76,
          top: 166,
          display: 'flex',
          width: 650,
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 104,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
            background: 'rgba(42, 168, 255, 0.16)',
            color: '#65c3ff',
            fontSize: 13,
            fontWeight: 820,
            letterSpacing: 2.2,
            textTransform: 'uppercase'
          }}
        >
          {isAiProviders ? 'BYOK AI' : 'Article'}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 22,
            fontSize: getBlogOgTitleSize(displayTitle),
            lineHeight: 0.98,
            fontWeight: 850,
            letterSpacing: 0
          }}
        >
          {displayTitle}
        </div>
        {displayDescription ? (
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              width: 620,
              color: 'rgba(248, 251, 255, 0.62)',
              fontSize: 25,
              lineHeight: 1.32,
              fontWeight: 520
            }}
          >
            {displayDescription}
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 76,
          top: 166,
          display: 'flex',
          width: 330,
          height: 330,
          flexDirection: 'column',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.13)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.028))',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'flex',
            height: 58,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            padding: '0 20px',
            color: 'rgba(248, 251, 255, 0.58)',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 1.8,
            textTransform: 'uppercase'
          }}
        >
          <div style={{ display: 'flex' }}>Context Map</div>
          <div style={{ display: 'flex', color: '#12c38c' }}>Live</div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}
        >
          {signalRows.map(([label, value], index) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 14,
                background:
                  index === 0
                    ? 'rgba(42, 168, 255, 0.12)'
                    : index === 1
                      ? 'rgba(255, 129, 70, 0.12)'
                      : 'rgba(18, 195, 140, 0.12)',
                padding: '14px 16px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  color: 'rgba(248, 251, 255, 0.5)',
                  fontSize: 12,
                  fontWeight: 820,
                  letterSpacing: 1.4
                }}
              >
                {label}
              </div>
              <div
                style={{
                  display: 'flex',
                  maxWidth: 150,
                  color: '#f8fbff',
                  fontSize: 15,
                  fontWeight: 820
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              width: 160,
              height: 58,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {(isAiProviders
              ? ['OPENAI', 'ANTH', 'AZURE']
              : ['SQL', 'AI', 'DB']
            ).map((label, index) => (
                <div
                  key={label}
                  style={{
                    position: 'absolute',
                    left: 14 + index * 44,
                    top: 8 + (index % 2) * 14,
                    display: 'flex',
                    width: isAiProviders ? 38 : 32,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 999,
                    background:
                      index === 0
                        ? '#2aa8ff'
                        : index === 1
                          ? '#12c38c'
                          : '#ff8146',
                    boxShadow: '0 0 28px rgba(42, 168, 255, 0.28)',
                    color: '#061018',
                    fontSize: isAiProviders ? 7 : 9,
                    fontWeight: 900
                  }}
                >
                  {label}
                </div>
              ))}
            <div
              style={{
                position: 'absolute',
                left: 36,
                right: 34,
                top: 27,
                display: 'flex',
                height: 2,
                background: 'rgba(248, 251, 255, 0.22)'
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 76,
          bottom: 58,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'rgba(248, 251, 255, 0.6)',
          fontSize: 18,
          fontWeight: 700
        }}
      >
        <div style={{ display: 'flex' }}>{footerPath}</div>
        <div style={{ display: 'flex', color: '#65c3ff' }}>DORY</div>
      </div>
    </div>
  );
}

export function BlogOgImage(props: BlogOgImageProps) {
  return <DoryBlogOgCard {...props} />;
}
