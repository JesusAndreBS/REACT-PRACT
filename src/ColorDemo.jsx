import { useState } from 'react';
import { colors, getColor } from './colors';

export function ColorDemo() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState({ primary: 0, secondary: 0, danger: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setStatus({ type: 'error', message: 'Completa todos los campos' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    await new Promise(r => setTimeout(r, 1000));
    
    setLoading(false);
    setStatus({ type: 'success', message: `Registrado: ${formData.name} (${formData.email})` });
    setFormData({ name: '', email: '' });
  };

  const handleClick = (type) => {
    setClicks(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setStatus({ 
      type: 'info', 
      message: `Click en ${type} (total: ${clicks[type] + 1})` 
    });
  };

  const handleDanger = () => {
    setStatus({ type: 'error', message: 'Acción peligrosa ejecutada' });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Sistema de Colores + Botones</h1>
        <p style={styles.subtitle}>Paleta + formulario + acciones reales</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.h2}>Paleta</h2>
        <div style={styles.grid}>
          {['primary', 'secondary', 'success', 'warning', 'error'].map(key => (
            <ColorCard key={key} category={key} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Botones funcionales</h2>
        <div style={styles.buttonRow}>
          <Button
            label={`Primario (${clicks.primary})`}
            color="primary"
            onClick={() => handleClick('primary')}
          />
          <Button
            label={`Secundario (${clicks.secondary})`}
            color="secondary"
            onClick={() => handleClick('secondary')}
          />
          <Button
            label={`Peligro (${clicks.danger})`}
            color="error"
            onClick={handleDanger}
          />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Registro simple</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Nombre</label>
            <input
              style={styles.input}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
            />
          </div>
          <Button
            type="submit"
            label={loading ? 'Guardando...' : 'Registrar'}
            color="primary"
            fullWidth
            disabled={loading}
          />
        </form>
      </section>

      {status.message && (
        <Alert type={status.type} message={status.message} />
      )}
    </div>
  );
}

function ColorCard({ category }) {
  const shades = ['main', 'light', 'dark'];
  const c = colors[category];
  
  return (
    <div style={styles.card}>
      <h3 style={{ ...styles.cardTitle, color: c.main }}>{category}</h3>
      <div style={styles.shades}>
        {shades.map(s => (
          <div key={s} style={styles.shade}>
            <div style={{ ...styles.swatch, backgroundColor: c[s] }} />
            <span style={styles.shadeLabel}>{s}</span>
            <span style={styles.shadeValue}>{c[s]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Button({ label, color, onClick, fullWidth, disabled, type = 'button' }) {
  const bg = getColor(color);
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.btn,
        backgroundColor: bg,
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
}

function Alert({ type, message }) {
  const bg = type === 'success' ? getColor('success') :
             type === 'error' ? getColor('error') :
             getColor('primary');
  return (
    <div style={{ ...styles.alert, backgroundColor: bg }}>
      {message}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  h1: {
    margin: '0 0 0.5rem',
    color: colors.neutral.gray800,
  },
  subtitle: {
    margin: 0,
    color: colors.neutral.gray500,
  },
  section: {
    marginBottom: '2rem',
  },
  h2: {
    margin: '0 0 1rem',
    color: colors.neutral.gray700,
    fontSize: '1.25rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    margin: '0 0 0.75rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  shades: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  shade: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  swatch: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    border: `1px solid ${colors.neutral.gray200}`,
  },
  shadeLabel: {
    width: '50px',
    fontSize: '0.75rem',
    color: colors.neutral.gray600,
  },
  shadeValue: {
    fontSize: '0.75rem',
    color: colors.neutral.gray500,
    fontFamily: 'monospace',
  },
  buttonRow: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  btn: {
    color: colors.neutral.white,
    border: 'none',
    padding: '0.625rem 1.25rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.1s',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: colors.neutral.white,
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: colors.neutral.gray700,
  },
  input: {
    padding: '0.625rem 0.75rem',
    border: `1px solid ${colors.neutral.gray300}`,
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  alert: {
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    color: colors.neutral.white,
    fontSize: '0.875rem',
    textAlign: 'center',
  },
};