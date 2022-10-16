package br.com.crud.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import br.com.crud.factory.ConnectionFactory;
import br.com.crud.model.Viagem;

public class ViagemDAO {
	
public void save (Viagem viagem) {
	String sql = "INSERT INTO viagem (origem,destino,data,preco)" +
		"VALUES (?,?,?,?)";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, viagem.getOrigem());
		pstm.setString(2, viagem.getDestino());
		pstm.setDate(3, (java.sql.Date) new Date(viagem.getData().getTime()));
		pstm.setDouble(4,viagem.getPreco());
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
public void removeById(int id_viagem) {
	String sql = "DELETE FROM viagem WHERE id_viagem = ?";
	
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setInt(1, id_viagem);
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
public void update (Viagem viagem) {
	String sql = "UPDATE viagem SET origem = ?, destino = ?, data = ?, preco = ?"
			+ "WHERE id_usuario = ?";
	Connection conn = null;
	PreparedStatement pstm = null;
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		
		pstm = conn.prepareStatement(sql);
		pstm.setString(1, viagem.getOrigem());
		pstm.setString(2, viagem.getDestino());
		pstm.setDate(3,(java.sql.Date) viagem.getData());
		pstm.setDouble(4, viagem.getPreco());
		pstm.setInt(5, viagem.getId_viagem());
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
public List<Viagem> getViagems(){
	String sql = "SELECT * FROM viagem";
	
	List<Viagem> viagems = new ArrayList<Viagem>();
	
	Connection conn = null;
	PreparedStatement pstm = null;
	ResultSet rset = null;
	
	try {
		conn = ConnectionFactory.createConnectionToMySQL();
		pstm = conn.prepareStatement(sql);
		rset = pstm.executeQuery();
		
		while(rset.next()) {
			Viagem viagem = new Viagem();
			viagem.setId_viagem(rset.getInt("id_viagem"));
			viagem.setOrigem(rset.getString("origem"));
			viagem.setDestino(rset.getString("destino"));
			viagem.setData(rset.getDate("data"));
			viagem.setPreco(rset.getInt("data"));
			viagems.add(viagem);
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
	return viagems;
}
}