<div class="container mt-4">
  <h2 class="text-center">Daftar Denda</h2>

  <!-- Loader -->
  <div class="d-flex justify-content-center mt-4" *ngIf="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <!-- Button to open the modal -->
  <button
    type="button"
    class="btn btn-primary mb-3"
    data-bs-toggle="modal"
    data-bs-target="#tambahDendaModal"
  >
    Tambah Denda
  </button>

  <!-- Table to display denda data -->
  <div *ngIf="denda.length > 0">
    <table class="table table-striped table-bordered">
      <thead class="table-primary">
        <tr>
          <th>No</th>
          <th>Jumlah Pinjam</th>
          <th>Buku</th>
          <th>Anggota</th>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="
            let item of denda
              | paginate : { itemsPerPage: itemsPerPage, currentPage: currentPage };
            index as i
          "
        >
          <td>{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
          <td>{{ item.jumlahPinjam }}</td>
          <td>{{ item.buku_id?.nama }}</td>
          <td>{{ item.anggota_id?.nama }}</td>
          <td>{{ item.harga }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm me-2"
              (click)="getDendaById(item._id)"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              (click)="deleteDenda(item._id)"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal Tambah Denda -->
  <div
    class="modal fade"
    id="tambahDendaModal"
    tabindex="-1"
    aria-labelledby="tambahDendaModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tambahDendaModalLabel">
            Tambah Denda
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form [formGroup]="dendaForm" (ngSubmit)="addDenda()">
            <div class="mb-3">
              <label for="jumlahPinjam" class="form-label">Jumlah Pinjam</label>
              <input
                id="jumlahPinjam"
                type="text"
                class="form-control"
                formControlName="jumlahPinjam"
                required
              />
            </div>
            <div class="mb-3">
              <label for="buku" class="form-label">Buku</label>
              <select
                id="buku"
                class="form-select"
                formControlName="buku_id"
                required
              >
                <option *ngFor="let buku of bukuList" [value]="buku._id">
                  {{ buku.nama }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="anggota" class="form-label">Anggota</label>
              <select
                id="anggota"
                class="form-select"
                formControlName="anggota_id"
                required
              >
                <option *ngFor="let anggota of anggotaList" [value]="anggota._id">
                  {{ anggota.nama }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="harga" class="form-label">Harga</label>
              <input
                id="harga"
                type="text"
                class="form-control"
                formControlName="harga"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="isSubmitting"
            >
              {{ isSubmitting ? "Menyimpan..." : "Tambah Denda" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Edit Denda -->
  <div
    class="modal fade"
    id="editDendaModal"
    tabindex="-1"
    aria-labelledby="editDendaModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editDendaModalLabel">Ubah Denda</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form [formGroup]="dendaForm" (ngSubmit)="updateDenda()">
            <div class="mb-3">
              <label for="editJumlahPinjam" class="form-label">Jumlah Pinjam</label>
              <input
                id="editJumlahPinjam"
                type="text"
                class="form-control"
                formControlName="jumlahPinjam"
                required
              />
            </div>
            <div class="mb-3">
              <label for="editBuku" class="form-label">Buku</label>
              <select
                id="editBuku"
                class="form-select"
                formControlName="buku_id"
                required
              >
                <option *ngFor="let buku of bukuList" [value]="buku._id">
                  {{ buku.nama }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="editAnggota" class="form-label">Anggota</label>
              <select
                id="editAnggota"
                class="form-select"
                formControlName="anggota_id"
                required
              >
                <option *ngFor="let anggota of anggotaList" [value]="anggota._id">
                  {{ anggota.nama }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="editHarga" class="form-label">Harga</label>
              <input
                id="editHarga"
                type="text"
                class="form-control"
                formControlName="harga"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="isSubmitting"
            >
              {{ isSubmitting ? "Menyimpan..." : "Ubah Denda" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <pagination-controls (pageChange)="currentPage = $event">
  </pagination-controls>
</div>
