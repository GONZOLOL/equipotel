'use client';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DeleteConfirmDialog = ({
    deleteDialogVisible,
    setDeleteDialogVisible,
    selectedProduct,
    onConfirmDelete,
}) => {
    return (
        <Dialog
            visible={deleteDialogVisible}
            onHide={() => setDeleteDialogVisible(false)}
            header="Confirmar Eliminación"
            modal
            className="p-fluid"
            style={{ width: '30rem' }}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: '2rem' }}
                />
                <span>
                    ¿Estás seguro de que quieres eliminar este producto?
                </span>
            </div>
            <div className="flex justify-end gap-2 mt-6">
                <Button
                    label="Cancelar"
                    severity="secondary"
                    outlined
                    onClick={() => setDeleteDialogVisible(false)}
                />
                <Button
                    label="Eliminar"
                    severity="danger"
                    onClick={onConfirmDelete}
                />
            </div>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
