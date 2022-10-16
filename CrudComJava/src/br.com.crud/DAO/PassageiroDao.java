package br.com.crud.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import br.com.crud.factory.ConnectionFactory;
import br.com.crud.model.Passageiro;

public class PassageiroDAO {
	
public void save (Passageiro passageiro) {
	String sql = "INSERT INTO passageiro(nome,cpf,telefone)" +
		"VALUES (?,?,?)";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, passageiro.getNome());
		pstm.setInt(2, passageiro.getCpf());
		pstm.setInt(3, passageiro.getTelefone());
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
public void removeById(int id_passageiro) {
	String sql = "DELETE FROM passageiro WHERE id_passageiro = ?";
	
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setInt(1, id_passageiro);
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
public void update (Passageiro passageiro) {
	String sql = "UPDATE passageiro SET nome = ?, cpf = ?, telefone = ?"
			+ "WHERE id_passageiro = ?";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, passageiro.getNome());
		pstm.setInt(2, passageiro.getCpf());
		pstm.setInt(3, passageiro.getTelefone());
		pstm.setInt(4, passageiro.getId_passageiro());
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
public List<Passageiro> getPassageiro(){
	String sql = "SELECT * FROM passageiro";
	
	List<Passageiro> passageiros = new ArrayList<Passageiro>();
	
	Connection conn = null;
	PreparedStatement pstm = null;
	ResultSet rset = null;
	
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		rset = pstm.executeQuery();
		
		while(rset.next()) {
			Passageiro passageiro = new Passageiro();
			passageiro.setId_passageiro(rset.getInt("id_passageiro"));
			passageiro.setNome(rset.getString("nome"));
			passageiro.setCpf(rset.getInt("cpf"));
			passageiro.setTelefone(rset.getInt("telefone"));
			passageiros.add(passageiro);
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
	return passageiros;
}
}