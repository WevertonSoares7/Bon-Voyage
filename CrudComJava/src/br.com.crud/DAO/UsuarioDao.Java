package br.com.crud.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import br.com.crud.factory.ConnectionFactory;
import br.com.crud.model.Usuario;

public class UsuarioDAO {
	
public void save (Usuario usuario) {
	String sql = "INSERT INTO usuario(nome,login,senha)" +
		"VALUES (?,?,?)";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, usuario.getNome());
		pstm.setString(2, usuario.getLogin());
		pstm.setString(3,usuario.getSenha());
		pstm.execute();
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
public void removeById(int id_usuario) {
	String sql = "DELETE FROM usuario WHERE id_usuario = ?";
	
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setInt(1, id_usuario);
		pstm.execute();
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
public void update (Usuario usuario) {
	String sql = "UPDATE usuario SET nome = ?, login = ?, senha = ?"
			+ "WHERE id_usuario = ?";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, usuario.getNome());
		pstm.setString(2, usuario.getLogin());
		pstm.setString(3,usuario.getSenha());
		pstm.setInt(4, usuario.getId_usuario());
		pstm.execute();
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
public List<Usuario> getUsuarios(){
	String sql = "SELECT * FROM usuario";
	
	List<Usuario> usuarios = new ArrayList<Usuario>();
	
	Connection conn = null;
	PreparedStatement pstm = null;
	ResultSet rset = null;
	
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		rset = pstm.executeQuery();
		
		while(rset.next()) {
			Usuario usuario = new Usuario();
			usuario.setId_usuario(rset.getInt("id_usuario"));
			usuario.setNome(rset.getString("nome"));
			usuario.setLogin(rset.getString("login"));
			usuario.setSenha(rset.getString("senha"));
			usuarios.add(usuario);
		}
	}catch (Exception e) {
		e.printStackTrace();
	}finally {
		try {
			if(rset != null) {
				rset.close();
			}
			if(pstm != null) {
				pstm.close();
			}
			if(conn != null) {
				conn.close();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	return usuarios;
}
}