using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class SpMedicalGroupContext : DbContext
    {
        public SpMedicalGroupContext()
        {
        }

        public SpMedicalGroupContext(DbContextOptions<SpMedicalGroupContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Clinicas> Clinicas { get; set; }
        public virtual DbSet<Consultas> Consultas { get; set; }
        public virtual DbSet<Especialidades> Especialidades { get; set; }
        public virtual DbSet<Medicos> Medicos { get; set; }
        public virtual DbSet<Prontuarios> Prontuarios { get; set; }
        public virtual DbSet<Situacao> Situacao { get; set; }
        public virtual DbSet<TiposUsuarios> TiposUsuarios { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data source =.\\SqlExpress;Initial Catalog=SENAI_SPMEDICALGROUP_MANHA; User id=sa;pwd=132");
                //optionsBuilder.UseSqlServer("Data source =.\\;Initial Catalog=SENAI_SPMEDICALGROUP_MANHA; Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clinicas>(entity =>
            {
                entity.ToTable("CLINICAS");

                entity.HasIndex(e => e.Cep)
                    .HasName("UQ__CLINICAS__C1FF39CF6C757AE3")
                    .IsUnique();

                entity.HasIndex(e => e.NomeFantasia)
                    .HasName("UQ__CLINICAS__62CD2EF542EF5A80")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Bairro)
                    .HasColumnName("BAIRRO")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Cep)
                    .IsRequired()
                    .HasColumnName("CEP")
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.Cidade)
                    .IsRequired()
                    .HasColumnName("CIDADE")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Cnpj)
                    .IsRequired()
                    .HasColumnName("CNPJ")
                    .HasMaxLength(18)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasColumnName("ESTADO")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.HorarioFuncionamento)
                    .IsRequired()
                    .HasColumnName("HORARIO_FUNCIONAMENTO")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NomeFantasia)
                    .IsRequired()
                    .HasColumnName("NOME_FANTASIA")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RazaoSocial)
                    .HasColumnName("RAZAO_SOCIAL")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Rua)
                    .IsRequired()
                    .HasColumnName("RUA")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Consultas>(entity =>
            {
                entity.ToTable("CONSULTAS");

                entity.HasIndex(e => e.DataAgendada)
                    .HasName("IDX_CONS_DATA");

                entity.HasIndex(e => e.IdMedico)
                    .HasName("IDX_CONS_ID_MEDICO");

                entity.HasIndex(e => e.IdProntuario)
                    .HasName("IDX_CONS_ID_PRONT");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DataAgendada)
                    .HasColumnName("DATA_AGENDADA")
                    .HasColumnType("date");

                entity.Property(e => e.Descricao)
                    .HasColumnName("DESCRICAO")
                    .HasColumnType("text");

                entity.Property(e => e.HoraAgendada).HasColumnName("HORA_AGENDADA");

                entity.Property(e => e.IdMedico).HasColumnName("ID_MEDICO");

                entity.Property(e => e.IdProntuario).HasColumnName("ID_PRONTUARIO");

                entity.Property(e => e.IdSituacao)
                    .HasColumnName("ID_SITUACAO")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.IdMedicoNavigation)
                    .WithMany(p => p.Consultas)
                    .HasForeignKey(d => d.IdMedico)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CONSULTAS__ID_ME__66603565");

                entity.HasOne(d => d.IdProntuarioNavigation)
                    .WithMany(p => p.Consultas)
                    .HasForeignKey(d => d.IdProntuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CONSULTAS__ID_PR__656C112C");

                entity.HasOne(d => d.IdSituacaoNavigation)
                    .WithMany(p => p.Consultas)
                    .HasForeignKey(d => d.IdSituacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CONSULTAS__ID_SI__6754599E");
            });

            modelBuilder.Entity<Especialidades>(entity =>
            {
                entity.ToTable("ESPECIALIDADES");

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__ESPECIAL__E2AB1FF4F5E5F949")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("NOME")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Medicos>(entity =>
            {
                entity.ToTable("MEDICOS");

                entity.HasIndex(e => e.Crm)
                    .HasName("IDX_MEDICOS_CRM");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Crm)
                    .IsRequired()
                    .HasColumnName("CRM")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IdClinica).HasColumnName("ID_CLINICA");

                entity.Property(e => e.IdEspecialidade).HasColumnName("ID_ESPECIALIDADE");

                entity.Property(e => e.IdUsuario).HasColumnName("ID_USUARIO");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("NOME")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdClinicaNavigation)
                    .WithMany(p => p.Medicos)
                    .HasForeignKey(d => d.IdClinica)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__MEDICOS__ID_CLIN__5FB337D6");

                entity.HasOne(d => d.IdEspecialidadeNavigation)
                    .WithMany(p => p.Medicos)
                    .HasForeignKey(d => d.IdEspecialidade)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__MEDICOS__ID_ESPE__5DCAEF64");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Medicos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__MEDICOS__ID_USUA__5EBF139D");
            });

            modelBuilder.Entity<Prontuarios>(entity =>
            {
                entity.ToTable("PRONTUARIOS");

                entity.HasIndex(e => e.Cep)
                    .HasName("UQ__PRONTUAR__C1FF39CFDA887565")
                    .IsUnique();

                entity.HasIndex(e => e.Cpf)
                    .HasName("IDX_PRONTUARIOS_CPF");

                entity.HasIndex(e => e.Rg)
                    .HasName("UQ__PRONTUAR__321537C8A82ECBCA")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Bairro)
                    .HasColumnName("BAIRRO")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Cep)
                    .IsRequired()
                    .HasColumnName("CEP")
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.Cidade)
                    .IsRequired()
                    .HasColumnName("CIDADE")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("CPF")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.DataNascimento)
                    .HasColumnName("DATA_NASCIMENTO")
                    .HasColumnType("date");

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasColumnName("ESTADO")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.IdUsuario).HasColumnName("ID_USUARIO");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("NOME")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Rg)
                    .IsRequired()
                    .HasColumnName("RG")
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.Rua)
                    .IsRequired()
                    .HasColumnName("RUA")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Telefone)
                    .HasColumnName("TELEFONE")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Prontuarios)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRONTUARI__ID_US__534D60F1");
            });

            modelBuilder.Entity<Situacao>(entity =>
            {
                entity.ToTable("SITUACAO");

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__SITUACAO__E2AB1FF41CC30046")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("NOME")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TiposUsuarios>(entity =>
            {
                entity.ToTable("TIPOS_USUARIOS");

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__TIPOS_US__E2AB1FF4A213FDE9")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("NOME")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.ToTable("USUARIOS");

                entity.HasIndex(e => e.Email)
                    .HasName("IDX_USUARIOS_EMAIL");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IdTipoUsuario).HasColumnName("ID_TIPO_USUARIO");

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasColumnName("SENHA")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__USUARIOS__ID_TIP__4D94879B");
            });
        }
    }
}
