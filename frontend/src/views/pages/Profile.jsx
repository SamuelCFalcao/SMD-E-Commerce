// View - Página de Perfil do Cliente
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthController';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser, deleteUser, logout, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validar senha se fornecida
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      // Só incluir senha se fornecida
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await updateUser(user.id, updateData);
      if (response.success) {
        setSuccess('Dados atualizados com sucesso!');
        setFormData({
          ...formData,
          password: '',
          confirmPassword: ''
        });
      } else {
        setError(response.error || 'Erro ao atualizar dados');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao atualizar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await deleteUser(user.id);
      if (response.success) {
        await logout();
        navigate('/');
      } else {
        setError(response.error || 'Erro ao excluir conta');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir conta. Tente novamente.');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-card">
          <h1>Meu Perfil</h1>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleUpdate} className="profile-form">
            <div className="form-group">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nova Senha (deixe em branco para não alterar)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Digite uma nova senha"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirmar Nova Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirme a nova senha"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>

          <div className="profile-actions">
            <h2>Zona de Perigo</h2>
            <p>Excluir sua conta é uma ação permanente. Todos os seus dados serão removidos.</p>
            
            {!showDeleteConfirm ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
              >
                Excluir Conta
              </button>
            ) : (
              <div className="delete-confirm">
                <p>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
                <div className="delete-confirm-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? 'Excluindo...' : 'Sim, Excluir Conta'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

